import React, { useEffect, useState, useMemo } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import type { ProveedorResponseDTO } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const ActiveBadge: React.FC<{ activo: boolean }> = ({ activo }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
      activo
        ? 'bg-green-500/20 text-green-400 border-green-500/30'
        : 'bg-red-500/20 text-red-400 border-red-500/30'
    }`}
  >
    {activo ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
    {activo ? 'Activo' : 'Inactivo'}
  </span>
);

const TableSkeleton: React.FC = () => (
  <div className="space-y-2 animate-pulse p-4">
    {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-white/5 rounded" />)}
  </div>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export const ProveedoresPage: React.FC = () => {
  const [proveedores, setProveedores] = useState<ProveedorResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchProveedores = () => {
    setLoading(true);
    apiClient
      .get<ProveedorResponseDTO[]>('/api/proveedores')
      .then((r) => setProveedores(r.data))
      .catch(() => {/* handled by interceptor */})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const filtered = useMemo(
    () =>
      proveedores.filter((p) =>
        search ? p.empresa.toLowerCase().includes(search.toLowerCase()) : true
      ),
    [proveedores, search]
  );

  const handleToggle = async (proveedor: ProveedorResponseDTO) => {
    setTogglingId(proveedor.idProveedor);
    try {
      await apiClient.put(`/api/proveedores/${proveedor.idProveedor}`, {
        ...proveedor,
        activo: !proveedor.activo,
      });
      setProveedores((prev) =>
        prev.map((p) =>
          p.idProveedor === proveedor.idProveedor ? { ...p, activo: !p.activo } : p
        )
      );
    } catch {
      /* handled by interceptor */
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          <span className="neon-text-cyan">Proveedores</span>
        </h1>
        <p className="text-sm text-gray-400">
          Gestión de catálogo de proveedores — lectura y toggle de estatus.
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por empresa…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none w-72"
          aria-label="Buscar proveedor"
        />
      </div>

      {/* TABLE */}
      <div className="glass-table-container">
        {loading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            {search
              ? `No se encontraron proveedores con "${search}".`
              : 'No hay proveedores registrados en el sistema.'}
          </div>
        ) : (
          <table className="w-full text-sm" aria-label="Lista de proveedores">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">RFC</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresa</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Correo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Condiciones de Pago</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estatus</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.idProveedor} className="glass-table-row">
                  <td className="px-4 py-3 font-mono text-neon-cyan text-xs">{p.rfc}</td>
                  <td className="px-4 py-3 text-gray-200 font-medium">{p.empresa}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{p.tel ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{p.correo ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{p.condicionesPago ?? '—'}</td>
                  <td className="px-4 py-3"><ActiveBadge activo={p.activo} /></td>
                  <td className="px-4 py-3">
                    <NeonButton
                      variant={p.activo ? 'pink' : 'green'}
                      onClick={() => handleToggle(p)}
                      disabled={togglingId === p.idProveedor}
                      className="py-1 px-3 text-xs"
                    >
                      {togglingId === p.idProveedor
                        ? 'Guardando…'
                        : p.activo
                          ? 'Desactivar'
                          : 'Activar'}
                    </NeonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
