import { DropZone } from "../../../DropZone";
import { rootDroppableId } from "../../../../lib/root-droppable-id";
import { useCallback, useRef, useState } from "react";
import { useAppContext } from "../../context";
import AutoFrame from "@measured/auto-frame-component";
import styles from "./styles.module.css";
import { getClassNameFactory } from "../../../../lib";

const getClassName = getClassNameFactory("PuckPreview", styles);

export const Preview = ({ id = "puck-preview" }: { id?: string }) => {
  const { config, dispatch, state } = useAppContext();

  const Page = useCallback(
    (pageProps) =>
      config.root?.render
        ? config.root?.render({ ...pageProps, editMode: true })
        : pageProps.children,
    [config.root]
  );

  // DEPRECATED
  const rootProps = state.data.root.props || state.data.root;

  const ref = useRef<HTMLIFrameElement>(null);

  const [stylesLoaded, setStylesLoaded] = useState(false);

  return (
    <div
      className={getClassName({ stylesLoaded })}
      id={id}
      onClick={() => {
        dispatch({ type: "setUi", ui: { ...state.ui, itemSelector: null } });
      }}
    >
      <div className={getClassName("content")}>
        <AutoFrame
          id="preview-iframe"
          className={getClassName("iframe")}
          data-rfd-iframe
          ref={ref}
          debug
          onStylesLoaded={() => {
            console.log("callback");
            setStylesLoaded(true);
          }}
        >
          <Page dispatch={dispatch} state={state} {...rootProps}>
            <DropZone zone={rootDroppableId} />
          </Page>
        </AutoFrame>
      </div>
    </div>
  );
};
