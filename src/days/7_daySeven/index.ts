// https://adventofcode.com/2022/day/7
import { Main } from '~/types';

type Path = string;

interface Item<TType extends 'file' | 'directory'> {
  type: TType;
}

interface File extends Item<'file'> {
  path: Path;
  name: string;
  size: number;
}

interface Directory extends Item<'directory'> {
  path: Path;
  name: string;
}

type FileSystem = Record<Path, File | Directory>;

const joinPaths = (...paths: Path[]): Path => {
  return paths.join('/').replace(/\/{2}/g, '/');
};

const resolvePath = (currentPath: Path, instruction: string): string => {
  if (!currentPath) return instruction;
  if (instruction === '..') return currentPath.slice(0, currentPath.lastIndexOf('/'));
  return joinPaths(currentPath, instruction);
};

const getFilesystem = (input: string): FileSystem => {
  const filesystem: FileSystem = {};
  const lines = input.split('\n');
  let currentPath: Path = '';
  lines.forEach(line => {
    switch (true) {
      case !!line.match(/^\$\scd\s/):
        currentPath = resolvePath(currentPath, line.slice('$ cd '.length));
        if (!filesystem[currentPath]) {
          filesystem[currentPath] = {
            type: 'directory',
            path: currentPath,
            name: currentPath,
          };
        }
        break;

      case !!line.match(/^dir\s/):
        const directoryName = line.slice('dir '.length);
        const directoryPath = joinPaths(currentPath, directoryName);
        filesystem[directoryPath] = {
          type: 'directory',
          path: directoryPath,
          name: directoryName,
        };
        break;

      case !!line.match(/^\d+\s/):
        const [size, fileName] = line.split(' ');
        const filePath = joinPaths(currentPath, fileName);
        filesystem[filePath] = {
          type: 'file',
          path: filePath,
          name: fileName,
          size: parseInt(size),
        };
        break;
    }
  });

  return filesystem;
};

export const partOne: Main = input => {
  const filesystem = getFilesystem(input);
  const [files, directories] = Object.values(filesystem).reduce(([files, directories], item) => {
    if (item.type === 'file') return [[...files, item], directories];
    return [files, [...directories, item]];
  }, [[], []] as [File[], Directory[]]);

  const directorySizes = directories.map(directory => {
    const filesInDirectory = files.filter(file => file.path.startsWith(directory.path));
    return filesInDirectory.reduce((total, file) => total + file.size, 0);
  });

  return directorySizes.reduce((total, size) => {
    if (size <= 1e5) return total + size;
    return total;
  }, 0);
};
