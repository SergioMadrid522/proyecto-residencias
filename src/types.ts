export interface OptionMenu {
  label: string;
  link: string;
  icon: string;
  viewbox: string;
}

export interface LeftSideMenuOption {
  admin: OptionMenu[];
  dev: OptionMenu[];
  tester: OptionMenu[];
}

export type StatsOverview = {
  icon: string;
  iconViewbox: string;
  title: string;
  stats: number;
};
type Severidad = "Critica" | "Alta" | "Media" | "Baja";
export interface Ticket {
  id: number;
  titulo: string;
  severidad: Severidad;
  ultimaActualizacion: string;
  link: string;
}
