import { type Params, type Image } from '../models/Image.model'

const exampleParams: Params = {
  prompt: 'Example prompt',
  token: 'Example token',
  negative_prompt: 'Example negative prompt',
  styles: ['style1', 'style2'],
  seed: 123,
  subseed: 456,
  subseed_strength: 0.5,
  seed_resize_from_h: 100,
  seed_resize_from_w: 100,
  sampler_name: 'Example sampler',
  batch_size: 10,
  n_iter: 5,
  steps: 3,
  cfg_scale: 1.0,
  width: 500,
  height: 500,
  restore_faces: true,
  tiling: false,
  do_not_save_samples: false,
  do_not_save_grid: false,
  eta: 0.1,
  denoising_strength: 0.5,
  s_min_uncond: 0.1,
  s_churn: 0.2,
  s_tmax: 0.3,
  s_tmin: 0.4,
  s_noise: 0.5,
  override_settings: {},
  override_settings_restore_afterwards: true,
  refiner_checkpoint: 'Example checkpoint',
  refiner_switch_at: 1,
  disable_extra_networks: false,
  comments: {},
  enable_hr: true,
  firstphase_width: 100,
  firstphase_height: 100,
  hr_scale: 2.0,
  hr_upscaler: 'Example upscaler',
  hr_second_pass_steps: 2,
  hr_resize_x: 200,
  hr_resize_y: 200,
  hr_checkpoint_name: 'Example HR checkpoint',
  hr_sampler_name: 'Example HR sampler',
  hr_prompt: 'Example HR prompt',
  hr_negative_prompt: 'Example HR negative prompt',
  sampler_index: 'Example index',
  script_name: 'Example script',
  script_args: [],
  send_images: true,
  save_images: true,
  alwayson_scripts: {}
}

export const exampleImage: Image = {
  id: '1',
  path_storage: '/path/to/image.png',
  params: exampleParams,
  url: 'https://storage.googleapis.com/cuentos-ai.appspot.com/images/6bdc5ad5-d507-4395-8f1f-1ffe3e055358.png'
}
