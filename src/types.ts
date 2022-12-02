export type Main = (input: string) => string | number;

export interface TestCase {
  description: string;
  input: string;
  expectedOutput: ReturnType<Main>;
}
