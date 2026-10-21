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
    return YAML.parse(await response.text());
  }
  return YAML.parse(fs.readFileSync(path.resolve(SOURCE, relativePath), 'utf8'));
}

// Each file is fetched once per process: the promise is cached (created, not awaited) so that
// concurrent callers, e.g. MyST transforms for several pages, all await the same download.
const cache = new Map();
function readOnce(relativePath) {
  if (!cache.has(relativePath)) cache.set(relativePath, read(relativePath));
  return cache.get(relativePath);
}

/** One mission file, e.g. await load('euclid'). */
export function load(mission) {
  return readOnce(`missions/${mission}.yaml`);
}

/** The shared services from irsa.yaml, keyed by `via` (e.g. 'sia', 'tap', 's3'). */
export async function services() {
  return (await readOnce('irsa.yaml')).services;
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
