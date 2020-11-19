import { createApp } from "vue";
import Message from "./Message.vue";

export type TypeProp = "success" | "danger" | "warning";

export default function CreateMessage(
  message: string,
  type: TypeProp,
  timeout: number = 2000
) {
  const app = createApp(Message, { message, type });

  const oDiv = document.createElement("div");
  document.body.appendChild(oDiv);
  // 将message组件挂载到#message 的 dom上
  app.mount(oDiv);

  setTimeout(() => {
    app.unmount("#message");
    document.body.removeChild(oDiv);
  }, timeout);
}
