import * as fileUpload from "@zag-js/file-upload"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createUniqueId, createMemo } from "solid-js"

export default function App() {
  const [state, send] = useMachine(
    fileUpload.machine({
      id: createUniqueId(),
    }),
  )

  const api = createMemo(() => fileUpload.connect(state, send, normalizeProps))

  return (
    <div {...api.rootProps}>
      <div {...api().dropzoneProps}>
        <input {...api().hiddenInputProps} />
        <span>Drag your file(s) here</span>
      </div>

      <button {...api().triggerProps}>Choose file(s)</button>

      <ul>
        <For each={api().files}>
          {(file) => (
            <li>
              <div>{file.name}</div>
              <button {...api().getDeleteTriggerProps({ file })}>Delete</button>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}