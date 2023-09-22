import { createMemo } from "solid-js"
import * as toggle from "@zag-js/toggle"
import { useMachine, normalizeProps } from "@zag-js/solid"

export default function App() {
  const [state, send] = useMachine(toggle.machine({
    id: "1"
  }))
  const api = createMemo(() => toggle.connect(state, send, normalizeProps))
  return (
    <button {...api().buttonProps}>
      {api().isPressed ? "On" : "Off"}
    </button>
  )
}
