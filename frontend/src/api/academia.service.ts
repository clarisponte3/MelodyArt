import apiClient from './apiClient';
import {
  AsistenciaClaseResponseDTO,
  AulaResponseDTO,
  BitacoraProgresoResponseDTO,
  ClaseMusicalResponseDTO,
  EstadoCuentaResponseDTO,
  EvaluacionResponseDTO,
  InscripcionResponseDTO,
  InscripcionRequestDTO,
} from '../types';

export const AcademiaService = {
  getClases: async (): Promise<ClaseMusicalResponseDTO[]> => {
    const { data } = await apiClient.get<ClaseMusicalResponseDTO[]>('/api/clases-musicales');
    return data;
  },

  getAulas: async (): Promise<AulaResponseDTO[]> => {
    const { data } = await apiClient.get<AulaResponseDTO[]>('/api/aulas');
    return data;
  },

  getInscripciones: async (): Promise<InscripcionResponseDTO[]> => {
    const { data } = await apiClient.get<InscripcionResponseDTO[]>('/api/inscripciones');
    return data;
  },

  inscribirAlumno: async (request: InscripcionRequestDTO): Promise<InscripcionResponseDTO> => {
    const { data } = await apiClient.post<InscripcionResponseDTO>('/api/inscripciones', request);
    return data;
  },

  getAsistencias: async (): Promise<AsistenciaClaseResponseDTO[]> => {
    const { data } = await apiClient.get<AsistenciaClaseResponseDTO[]>('/api/asistencias');
    return data;
  },

  getBitacoras: async (): Promise<BitacoraProgresoResponseDTO[]> => {
    const { data } = await apiClient.get<BitacoraProgresoResponseDTO[]>('/api/bitacoras');
    return data;
  },

  getEvaluaciones: async (): Promise<EvaluacionResponseDTO[]> => {
    const { data } = await apiClient.get<EvaluacionResponseDTO[]>('/api/evaluaciones');
    return data;
  },

  getEstadosCuenta: async (): Promise<EstadoCuentaResponseDTO[]> => {
    const { data } = await apiClient.get<EstadoCuentaResponseDTO[]>('/api/estados-cuenta');
    return data;
  },
};
