import { Request, Response } from "express";
import { profileRepository, userRepository } from "../repositories";

class ProfileController {
  async create(req: Request, res: Response) {
    const { firstName, lastName, age } = req.body;

    const userId = req.userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(200).json({ message: "Usuário não encontrado!" });
    }

    const profiles = await profileRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (profiles.length >= 3) {
      return res.status(200).json({ message: "Quantidade máxima de 3 profiles por usuário foi atingida!" });
    }

    const newProfile = profileRepository.create({ firstName, lastName, age });
    newProfile.user = user;
    await profileRepository.save(newProfile);

    return res.status(200).json({ message: "Perfil criado com sucesso!" });
  }

  async listProfilesByUser(req: Request, res: Response) {
    const userId = req.userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(200).json({ message: "Usuário não encontrado!" });
    }

    const profiles = await profileRepository
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.user", "user")
      .select(["profile.id", "profile.firstName", "profile.lastName", "profile.age", "user.id", "user.login"])
      .where("profile.user = :id", { id: userId })
      .getMany();

    return res.status(200).json(profiles);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const profile = await profileRepository
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.user", "user")
      .where("profile.id = :id", { id: Number(id) })
      .andWhere("user.id = :userId", { userId: userId })
      .getOne();

    if (!profile) {
      return res.status(404).json({ message: "Profile não encontrado!" });
    }

    await profileRepository.softRemove(profile);
    return res.status(200).json({ message: "Profile removido com sucesso!" });
  }
}

export default new ProfileController();
