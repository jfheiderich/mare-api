import { Request, Response } from "express";
import CandidateServices from "./candidate.services";

const candidate_services = new CandidateServices();

export default class CandidateControllers {
  async candidateCreateController(req: Request, res: Response) {
    try {
      const body = req.body;
      const candidate = await candidate_services.candidateCreateService(body);
      res.status(candidate.status).send(candidate.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async candidateUpdateController(req: Request, res: Response) {
    try {
      const body = req.body;
      const id = req.params.id;
      const candidate = await candidate_services.candidateUpdateService(
        id,
        body
      );
      res.status(candidate.status).send(candidate.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async candidateDeleteController(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const candidate = await candidate_services.candidateDeleteService(id);
      res.status(candidate.status).send(candidate.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async candidateListAllController(req: Request, res: Response) {
    try {
      const allCandidates = await candidate_services.candidatesListAllService();
      res.status(allCandidates.status).send(allCandidates.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async candidateListByIdController(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const candidate = await candidate_services.candidateListByIdService(id);
      res.status(candidate.status).send(candidate.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async candidateListDetailsByCPFController(req: Request, res: Response) {
    try {
      const cpf = req.params.cpf;
      const candidate =
        await candidate_services.candidateListDetailsByCPFService(cpf);
      res.status(candidate.status).send(candidate.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async candidateListPublicByCPFController(req: Request, res: Response) {
    try {
      const cpf = req.params.cpf;
      const candidate =
        await candidate_services.candidateListPublicByCPFService(cpf);
      res.status(candidate.status).send(candidate.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }
}
