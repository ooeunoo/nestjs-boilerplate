import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as merge from 'lodash.merge';

dotenv.config(); // 환경 변수 로드

const YAML_CONFIG_FILENAME = 'default.yaml';
const ENV_CONFIG_FILENAME = `${process.env.NODE_ENV || 'development'}.yaml`;

export default () => {
  const defaultConfig = yaml.load(
    readFileSync(join(process.cwd(), 'config', YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;

  const envConfig = yaml.load(
    readFileSync(join(process.cwd(), 'config', ENV_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;

  // 기본 설정과 환경별 설정을 병합
  return merge(defaultConfig, envConfig);
};
