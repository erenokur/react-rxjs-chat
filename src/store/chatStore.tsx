import { Subject, Subscription } from "rxjs";

export interface Message {
  person: string;
  text: string;
}

export interface ChatState {
  status: string;
  data: Message[];
  newDataCount: number;
  error: string;
}

const subject = new Subject<ChatState>();

const initialState: ChatState = {
  status: "",
  data: [],
  newDataCount: 0,
  error: "",
};

let state: ChatState = initialState;

const chatStore = {
  init: (): void => {
    state = { ...state, newDataCount: 0 };
    subject.next(state);
  },
  subscribe: (setState: (state: ChatState) => void): Subscription =>
    subject.subscribe(setState),
  sendMessage: (message: Message): void => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1,
    };
    subject.next(state);
  },
  clearChat: (): void => {
    state = initialState;
    subject.next(state);
  },
  initialState,
};

export default chatStore;
