export const defaultExtensionColour = '#f8f9fa';

export const getExtensionColour = (extension: string) =>
  extensionToType[extension]
    ? typeToColour[extensionToType[extension]]
    : defaultExtensionColour;

const typeToColour: any = {
  sheet: '#00ff80',
  image: '#8000ff',
  video: '#00ffff',
  audio: '#ff0080',
  archive: '#ff8000',
  exec: '#00ff00',
  code: '#00ffff',
  web: '#0000ff',
  font: '#ff00ff',
  slide: '#ff0000',
  text: '#0080ff',
  book: '#ffff00',
};

const extensionToType: any = {
  ogm: 'video',
  doc: 'text',
  class: 'code',
  js: 'code',
  swift: 'code',
  cc: 'code',
  tga: 'image',
  ape: 'audio',
  woff2: 'font',
  cab: 'archive',
  whl: 'archive',
  mpe: 'video',
  rmvb: 'video',
  srt: 'video',
  pdf: 'text',
  xz: 'archive',
  exe: 'exec',
  m4a: 'audio',
  crx: 'exec',
  vob: 'video',
  tif: 'image',
  gz: 'archive',
  roq: 'video',
  m4v: 'video',
  gif: 'image',
  rb: 'code',
  '3g2': 'video',
  m4: 'code',
  ar: 'archive',
  vb: 'code',
  sid: 'audio',
  ai: 'image',
  wma: 'audio',
  pea: 'archive',
  bmp: 'image',
  py: 'code',
  mp4: 'video',
  m4p: 'video',
  ods: 'sheet',
  jpeg: 'image',
  command: 'exec',
  azw4: 'book',
  otf: 'font',
  ebook: 'text',
  rtf: 'text',
  ttf: 'font',
  mobi: 'book',
  ra: 'audio',
  flv: 'video',
  ogv: 'video',
  mpg: 'video',
  xls: 'sheet',
  jpg: 'image',
  mkv: 'video',
  nsv: 'video',
  mp3: 'audio',
  kmz: 'image',
  java: 'code',
  lua: 'code',
  m2v: 'video',
  deb: 'archive',
  rst: 'text',
  csv: 'sheet',
  yaml: 'text',
  yml: 'text',
  pls: 'audio',
  pak: 'archive',
  egg: 'archive',
  tlz: 'archive',
  c: 'code',
  cbz: 'book',
  xcodeproj: 'code',
  iso: 'archive',
  xm: 'audio',
  azw: 'book',
  webm: 'video',
  '3ds': 'image',
  azw6: 'book',
  azw3: 'book',
  php: 'code',
  kml: 'image',
  woff: 'font',
  log: 'text',
  zipx: 'archive',
  '3gp': 'video',
  po: 'code',
  mpa: 'audio',
  mng: 'video',
  wps: 'text',
  wpd: 'text',
  a: 'archive',
  s7z: 'archive',
  ics: 'sheet',
  tex: 'text',
  go: 'code',
  ps: 'image',
  org: 'text',
  sh: 'exec',
  msg: 'text',
  xml: 'code',
  cpio: 'archive',
  epub: 'book',
  docx: 'text',
  lha: 'archive',
  flac: 'audio',
  odp: 'slide',
  wmv: 'video',
  vcxproj: 'code',
  mar: 'archive',
  eot: 'font',
  less: 'web',
  asf: 'video',
  apk: 'archive',
  css: 'web',
  mp2: 'video',
  odt: 'text',
  patch: 'code',
  wav: 'audio',
  msi: 'exec',
  rs: 'code',
  gsm: 'audio',
  ogg: 'video',
  cbr: 'book',
  azw1: 'book',
  m: 'code',
  dds: 'image',
  h: 'code',
  dmg: 'archive',
  mid: 'audio',
  psd: 'image',
  dwg: 'image',
  aac: 'audio',
  s3m: 'audio',
  cs: 'code',
  cpp: 'code',
  au: 'audio',
  aiff: 'audio',
  diff: 'code',
  avi: 'video',
  bat: 'exec',
  html: 'code',
  pages: 'text',
  bin: 'exec',
  txt: 'text',
  rpm: 'archive',
  m3u: 'audio',
  max: 'image',
  vcf: 'sheet',
  svg: 'image',
  ppt: 'slide',
  pptx: 'slide',
  clj: 'code',
  png: 'image',
  svi: 'video',
  tiff: 'image',
  tgz: 'archive',
  mxf: 'video',
  '7z': 'archive',
  drc: 'video',
  yuv: 'video',
  mov: 'video',
  tbz2: 'archive',
  bz2: 'archive',
  gpx: 'image',
  shar: 'archive',
  xcf: 'image',
  dxf: 'image',
  jar: 'archive',
  qt: 'video',
  tar: 'archive',
  xpi: 'archive',
  zip: 'archive',
  thm: 'image',
  cxx: 'code',
  '3dm': 'image',
  rar: 'archive',
  md: 'text',
  scss: 'web',
  mpv: 'video',
  webp: 'image',
  war: 'archive',
  pl: 'code',
  xlsx: 'sheet',
  mpeg: 'video',
  aaf: 'video',
  avchd: 'video',
  mod: 'audio',
  rm: 'video',
  it: 'audio',
  wasm: 'web',
  el: 'code',
  eps: 'image',
};
