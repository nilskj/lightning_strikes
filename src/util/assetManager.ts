/**
 * Async wrapper over load_assets with onProgress callback
 * @param img_paths
 * @param snd_paths
 * @param font
 * @param onProgress
 * @returns {{load: (function(): Promise<unknown>)}}
 */
import { Assets } from "../types/types";

interface AssetManagerProps {
  img_paths: string[];
  snd_paths: string[];
  onProgress: (progress: number, file: any) => void;
}

export function assetManager({
  img_paths,
  snd_paths,
  onProgress,
}: AssetManagerProps): Assets {
  return {
    load: () =>
      new Promise((resolve, reject) => {
        let assets: Assets = {};
        window.load_assets(
          [...img_paths],
          [...snd_paths],
          (progress: number, file: string, asst: any) => {
            assets[file] = asst;
            onProgress(progress, file);
            if (progress >= 1.0) {
              resolve(assets);
            }
          },
          () => reject()
        );
      }),
  };
}
