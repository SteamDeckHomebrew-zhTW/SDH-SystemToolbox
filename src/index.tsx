import {
    definePlugin,
    PanelSection,
    PanelSectionRow,
    ServerAPI,
    staticClasses,
    ToggleField,
} from "decky-frontend-lib";
import { VFC, useState } from "react";
import { FaToolbox } from "react-icons/fa";

import * as backend from "./backend"
 
const Content: VFC<{ server: ServerAPI }> = ({server}) => {
    backend.setServer(server);

    const [sshServerToggleValue, setSshServerToggleState]   = useState<boolean>(false);
    const [cefServerToggleValue, setCefServerToggleState]   = useState<boolean>(false);
    const [largePagesToggleValue, setLargePagesToggleState] = useState<boolean>(false);

    backend.resolvePromise(backend.getSSHServerState(), setSshServerToggleState);
    backend.resolvePromise(backend.getCEFServerState(), setCefServerToggleState);
    backend.resolvePromise(backend.getHugePagesState(), setLargePagesToggleState);

    return (
        <PanelSection>
            <PanelSection title="服務">
                <PanelSectionRow>
                    <ToggleField
                        label="遠端終端存取"
                        description="允許使用 SSH 存取 Deck"
                        checked={sshServerToggleValue}
                        onChange={(value: boolean) => {
                            backend.setSSHServerState(value);
                            setSshServerToggleState(value);
                        }}
                    />
                </PanelSectionRow>

                <PanelSectionRow>
                    <ToggleField
                        label="遠端偵錯存取"
                        description="轉發 Steam CEF 遠端偵錯"
                        checked={cefServerToggleValue}
                        onChange={(value: boolean) => {
                            backend.setCEFServerState(value);
                            setCefServerToggleState(value);
                        }}
                    />
                </PanelSectionRow>
            </PanelSection>
            <PanelSection title="設定">
                <PanelSectionRow>
                    <ToggleField
                        label="Linux Huge Pages"
                        description="啟用 Kernel Huge Pages 支援"
                        checked={largePagesToggleValue}
                        onChange={(value: boolean) => {
                            backend.setHugePagesState(value);
                            setLargePagesToggleState(value);
                        }}
                    />
                </PanelSectionRow>
            </PanelSection>
        </PanelSection>
    );
};

export default definePlugin((serverApi: ServerAPI) => {
    return {
        title: <div className={staticClasses.Title}>Example Plugin</div>,
        content: <Content server={serverApi} />,
        icon: <FaToolbox />,
        onDismount() {

        },
    };
});
