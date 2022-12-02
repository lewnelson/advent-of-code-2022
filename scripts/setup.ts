import fs from 'fs';
import path from 'path';
import { getDayString } from '~/lib/days';
import { paths } from '~/constants';

const baseDir = paths.days;

const createDirIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    fs.mkdirSync(dir);
  }
};

const setupBaseDir = () => {
  createDirIfNotExists(baseDir);
};

const renderTemplate = (template: string, parameters: Record<string, string>) => {
  return Object.entries(parameters).reduce((acc, [key, value]) => {
    const pattern = new RegExp(`<<\s?${key}\s?>>`, 'g');
    return acc.replace(pattern, value);
  }, template);
};

const writeFromTemplate = (dayDirectory: string, filename: string, parameters?: Record<string, string>) => {
  const templatePath = path.join(paths.template, filename);
  const templateContents = fs.readFileSync(templatePath, { encoding: 'utf8' });
  const outputPath = path.join(dayDirectory, filename);
  const exists = fs.existsSync(outputPath);
  if (!exists) {
    fs.writeFileSync(outputPath, renderTemplate(templateContents, parameters ?? {}), { encoding: 'utf8' });    
  }
};

const copyTemplate = (day: number) => {
  const dayString = getDayString(day);
  const dayDirectory = path.join(baseDir, `${day}_${getDayString(day)}`);
  createDirIfNotExists(dayDirectory);
  writeFromTemplate(dayDirectory, 'index.ts', { day: `${day}` });
  writeFromTemplate(dayDirectory, 'input.txt');
  writeFromTemplate(dayDirectory, 'index.test.ts', { day: dayString });
};

const writeDaysIndex = () => {
  const contents = [];
  new Array(25).fill(null).map((_, i) => {
    const day = i + 1;
    const dayString = getDayString(day);
    contents.push(`export * as ${dayString} from './${day}_${dayString}';`);
  });

  contents.push('');
  const indexPath = path.join(paths.days, 'index.ts');
  const exists = fs.existsSync(indexPath);
  if (!exists) {
    fs.writeFileSync(indexPath, contents.join('\n'), { encoding: 'utf8' });
  }
};

const setup = () => {
  setupBaseDir();
  new Array(25).fill(null).map((_, i) => {
    const day = i + 1;
    copyTemplate(day);
  });

  writeDaysIndex();
};

setup();
