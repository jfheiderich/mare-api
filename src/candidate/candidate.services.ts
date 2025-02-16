import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CandidateServices {
  async candidateCreateService(data: ICandidate) {
    try {
      const {
        birthDate,
        cep,
        city,
        courses,
        cpf,
        education,
        experiences,
        gender,
        name,
        neighborhood,
        pcd,
        phone,
        race,
        note,
        registration_via,
      } = data;

      const existingCandidate = await prisma.candidate.findUnique({
        where: { cpf },
      });

      if (existingCandidate) {
        return { status: 409, response: { error: "candidate already exists" } };
      }

      const missingFields = [];

      if (!birthDate) missingFields.push("birthDate");
      // if (!cep) missingFields.push("cep");
      if (!city) missingFields.push("city");
      // if (!courses) missingFields.push("courses");
      if (!cpf) missingFields.push("cpf");
      if (!education) missingFields.push("education");
      if (!experiences) missingFields.push("experiences");
      if (!gender) missingFields.push("gender");
      if (!name) missingFields.push("name");
      if (!neighborhood) missingFields.push("neighborhood");
      if (!pcd) missingFields.push("pcd");
      if (!phone) missingFields.push("phone");
      if (!race) missingFields.push("race");
      // if (!state) missingFields.push("state");
      // if (!registration_via) missingFields.push("registration_via");

      if (missingFields.length > 0) {
        return {
          status: 400,
          response: `The following fields are missing: ${missingFields.join(
            ", "
          )}`,
        };
      }

      const objCandidate = {
        birthDate,
        cep,
        city,
        courses,
        cpf,
        education,
        gender,
        name,
        neighborhood,
        pcd,
        phone,
        race,
        note,
        registration_via,
        state: "Espírito Santo",
      };

      const candidate = await prisma.candidate.create({
        data: {
          ...objCandidate,
          experiences: {
            create: experiences,
          },
        },
      });

      const candidateObjToShow = {
        id: candidate.id,
        ...objCandidate,
      };

      return { status: 201, response: candidateObjToShow };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async candidateUpdateService(id: string, data: Partial<ICandidate>) {
    if (!id) {
      return { status: 400, response: "id is empty" };
    }

    try {
      const candidateToUpdate = await prisma.candidate.findFirst({
        where: { id },
      });

      if (!candidateToUpdate) {
        return { status: 404, response: { error: "candidate not found" } };
      }

      const updatedData: any = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      if (data.experiences) {
        updatedData.experiences = {
          upsert: data.experiences.map((experience: any) => ({
            where: { id: experience.id },
            update: { ...experience },
            create: { ...experience },
          })),
        };
      }

      const candidateUpdated = await prisma.candidate.update({
        where: { id },
        data: updatedData,
      });

      return { status: 200, response: candidateUpdated };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async candidateDeleteService(id: string) {
    if (!id) {
      return { status: 400, response: "id is empty" };
    }

    try {
      const candidateToDelete = await prisma.candidate.findFirst({
        where: {
          id,
        },
      });

      if (!candidateToDelete) {
        return { status: 404, response: "candidate not found" };
      }

      await prisma.candidate.delete({
        where: { id },
      });

      return {
        status: 204,
        response: "candidate deleted successfully",
      };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async candidatesListAllService() {
    try {
      const candidates = await prisma.candidate.findMany();

      return { status: 200, response: candidates };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async candidateListByIdService(id: string) {
    if (!id) {
      return { status: 400, response: "id is empty" };
    }

    try {
      const candidate = await prisma.candidate.findFirst({
        where: {
          id,
        },
      });

      if (!candidate) {
        return { status: 404, response: "candidate not found" };
      }

      return { status: 200, response: candidate };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async candidateListDetailsByCPFService(cpf: string) {
    if (!cpf) {
      return { status: 400, response: "CPF is empty" };
    }

    try {
      const candidate = await prisma.candidate.findFirst({
        where: {
          cpf,
        },
      });

      if (!candidate) {
        return { status: 404, response: "candidate not found" };
      }

      return { status: 200, response: candidate };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async candidateListPublicByCPFService(cpf: string) {
    if (!cpf) {
      return { status: 400, response: "CPF is empty" };
    }

    try {
      const candidate = await prisma.candidate.findFirst({
        where: {
          cpf,
        },
      });

      if (!candidate) {
        return { status: 404, response: "candidate not found" };
      }

      const responsePublic = {
        name: candidate.name,
        created_at: candidate.created_at,
        is_active: candidate.destroyed_at ? false : true,
      };

      return { status: 200, response: responsePublic };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }
}
