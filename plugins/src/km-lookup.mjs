/**
 * Reading the IRSA knowledge map: the JavaScript counterpart of the map's km_lookup.py
 * (https://github.com/jaladh-singhal/irsa-knowledge-map/blob/main/km_lookup.py). Same function
 * names and arguments where the concept is the same; no MyST code here.
 *
 * The YAML nests collection -> dataset -> access entries {via, name}, and each `via` names a
 * service in irsa.yaml. Dataset ids are <mission>.<collection>.<product>.
 *
 * Reads GitHub main by default, or KM_SOURCE (a base URL or a local checkout) if set.
 */

import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export const RAW_MAIN = 'https://raw.githubusercontent.com/jaladh-singhal/irsa-knowledge-map/main/';
export const SOURCE = process.env.KM_SOURCE ?? RAW_MAIN;

async function read(relativePath) {
  if (/^https?:\/\//.test(SOURCE)) {
    const response = await fetch(new URL(relativePath, SOURCE.replace(/\/?$/, '/')));
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${relativePath}`);
    return response.text();
  }
  return fs.readFileSync(path.resolve(SOURCE, relativePath), 'utf8');
}

// Each file is fetched once per process: the promise is cached (created, not awaited) so that
// concurrent callers, e.g. MyST transforms for several pages, all await the same download.
// The raw text is kept too, to find the line an id is on.
const cache = new Map();
function readOnce(relativePath) {
  if (!cache.has(relativePath)) {
    cache.set(relativePath, read(relativePath).then(text => ({ text, data: YAML.parse(text) })));
  }
  return cache.get(relativePath);
}

/** One mission file, e.g. await load('euclid'). */
export async function load(mission) {
  return (await readOnce(`missions/${mission}.yaml`)).data;
}

/** The shared services from irsa.yaml, keyed by `via` (e.g. 'sia', 'tap', 's3'). */
export async function services() {
  return (await readOnce('irsa.yaml')).data.services;
}

/** [id, kind, status] of each collection, optionally only one kind, e.g. kind='release'. */
export function collections(missionData, kind = null) {
  return missionData.collections
    .filter(c => kind === null || c.kind === kind)
    .map(c => [c.id, c.kind, c.status]);
}

/** The collection `<mission>.<collection>`, or null if the map doesn't list it. */
export function collection(missionData, collectionKey) {
  const collectionId = `${missionData.mission.id}.${collectionKey}`;
  return missionData.collections.find(c => c.id === collectionId) ?? null;
}

/** The dataset `<mission>.<collection>.<product>`, or null if the map doesn't list it. */
export function dataset(missionData, collectionKey, product) {
  const datasetId = `${missionData.mission.id}.${collectionKey}.${product}`;
  return (collection(missionData, collectionKey)?.datasets ?? []).find(d => d.id === datasetId) ?? null;
}

/** Names one product is served under for one service, e.g. its TAP table. [] if not listed. */
export function names(missionData, collectionKey, product, via) {
  return (dataset(missionData, collectionKey, product)?.access ?? [])
    .filter(entry => entry.via === via && entry.name)
    .map(entry => entry.name);
}

/**
 * Every [name, dataset] a collection is served under for one service, optionally only datasets
 * of one type (e.g. 'catalog'). No km_lookup.py equivalent yet.
 */
export function collectionNames(missionData, collectionKey, via, datasetType = null) {
  return (collection(missionData, collectionKey)?.datasets ?? [])
    .filter(d => datasetType === null || d.type === datasetType)
    .flatMap(d => (d.access ?? [])
      .filter(entry => entry.via === via && entry.name)
      .map(entry => [entry.name, d]));
}

// Mission-file sections of entries with an id like a dataset's, e.g. euclid.tutorials.euclid-cloud-access
export const SECTIONS = ['tutorials', 'tools', 'identifiers', 'docs'];

/**
 * The part of a mission file an id points to, or null: the mission block ('euclid'), a section
 * entry ('euclid.tutorials.euclid-cloud-access'), a collection ('euclid.q1') or a dataset
 * ('euclid.q1.mer-catalog'). No km_lookup.py equivalent yet.
 */
export function find(missionData, id) {
  const [, second, third] = id.split('.');
  if (!second) return missionData.mission;
  if (SECTIONS.includes(second)) return (missionData[second] ?? []).find(entry => entry.id === id) ?? null;
  return third ? dataset(missionData, second, third) : collection(missionData, second);
}

/**
 * Values of one field of a collection or dataset: the names it's served under if `field` is a
 * service key it has access entries for (e.g. 'tap'), else the field itself (e.g. 'doi').
 * [] if it has the service without a name; null if it has no such field. No km_lookup.py
 * equivalent yet.
 */
export function values(entity, field) {
  const entries = (entity.access ?? []).filter(entry => entry.via === field);
  if (entries.length) return entries.filter(entry => entry.name).map(entry => entry.name);
  const value = entity[field];
  if (value === undefined || value === null || typeof value === 'object') return null;
  return [String(value)];
}

/** The fields values() can read for a collection or dataset. No km_lookup.py equivalent yet. */
export function fieldNames(entity) {
  const services = (entity.access ?? []).map(entry => entry.via);
  const scalars = Object.keys(entity).filter(key => entity[key] !== null && typeof entity[key] !== 'object');
  return [...new Set([...services, ...scalars])];
}

/**
 * Where a map file mentions `text` (e.g. 'id: euclid.q1', 'tools:'), as a link a writer can
 * open: a GitHub page at that line when the map is read from GitHub, else `path:line` in the
 * local checkout. `relativePath` is e.g. 'missions/euclid.yaml' or 'irsa.yaml'.
 */
export async function sourceLink(relativePath, text = null) {
  const { text: contents } = await readOnce(relativePath);
  const escaped = text?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const index = text ? contents.search(new RegExp(`${escaped}(?=[\\s,}:])`)) : -1;
  const line = index < 0 ? null : contents.slice(0, index).split('\n').length;
  const anchor = line ? `#L${line}` : '';
  const github = SOURCE.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+\/[^/]+)\/(.+?)\/?$/);
  if (github) return `https://github.com/${github[1]}/blob/${github[2]}/${relativePath}${anchor}`;
  if (/^https?:\/\//.test(SOURCE)) return new URL(relativePath, SOURCE.replace(/\/?$/, '/')).href;
  return `${path.resolve(SOURCE, relativePath)}${line ? `:${line}` : ''}`;
}
