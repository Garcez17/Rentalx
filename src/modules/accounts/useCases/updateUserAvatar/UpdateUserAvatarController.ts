import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const updateAvatar = container.resolve(UpdateUserAvatarUseCase);

    await updateAvatar.execute({
      user_id,
      avatar_file: req.file.filename,
    });

    return res.status(204).send();
  }
}

export { UpdateUserAvatarController };
