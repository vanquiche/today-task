export interface TaskType {
  id: string;
  createdAt: string;
  task: string;
  completed: boolean;
  position: number;
}

export interface ModalProviderType {
  state: boolean;
  open: () => void;
  close: () => void;
}
