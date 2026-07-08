import {
  LeftSideMenuOption,
  ModalState,
  OptionMenu,
  Ticket,
  UserContext,
} from "@/types";

export type RegisterUserProps =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: {
        nombre: string;
        email: string;
        rolId: number;
        password: string;
      };
    };

export type CreateTicketProps =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: Ticket;
    };

export interface CreateProjectProps {
  nombreProyecto: string;
  descripcion: string;
  activo: boolean;
}
export type CreateProjectResult =
  | {
      success: true;
      data: {
        nombreProyecto: string;
        descripcion: string;
        activo: boolean;
      };
    }
  | {
      success: false;
      error: string;
    };

export type ModalContextType = {
  modal: ModalState;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
};

export type UserContextProps = {
  userType: UserContext;
  setUserType: React.Dispatch<React.SetStateAction<UserContext>>;
};

export type ActionProps = {
  id: number;
  userRol?: string;
};

export interface UpdateUserData {
  id: number;
  nombre: string;
  email: string;
  password: string;
  status: number;
  rol: number;
}
export interface RenderOptionsProps {
  data: {
    option: OptionMenu[];
    basePath: string;
    rolMapper: Record<number, keyof LeftSideMenuOption>;
    activeRol: keyof LeftSideMenuOption;
  };
}
