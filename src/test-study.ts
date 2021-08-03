import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { generateReport, readFileAsObj } from './utils';

export async function testStudy (): Promise<void> {

  if (process.argv[2] && process.argv[2].toLocaleLowerCase() === 'global') return;

  console.log('Start to generate test study.');

  const config = readFileAsObj(join(__dirname, '../test-study/config.yaml')) ?? {};
  const reportContent = await generateReport({
    sqlsDir: join(__dirname, '../test-study/sqls'),
    customConfig: config,
    sqls: config.sqls,
  });

  if (reportContent === null) return;

  const distDir = join(__dirname, '../dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir);
  }
  const testStudyFile = join(distDir, 'test-study.html');
  writeFileSync(testStudyFile, reportContent);

  console.log(`Generate test study into ${testStudyFile}`);
}

