import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { ConcreteReportVideo } from './Video';
import { loadData, ConcreteData } from './utils/loadData';
import { useEffect, useState } from 'react';
import './style.css';

export const RemotionRoot: React.FC = () => {
    const [data, setData] = useState<ConcreteData[]>([]);
    const [handle] = useState(() => delayRender());

    useEffect(() => {
        // Assuming data.csv is in the public folder or served at root
        // In dev mode, we can use a relative fetch
        loadData(`/data.csv`)
            .then((d) => {
                setData(d);
                continueRender(handle);
            })
            .catch((err) => {
                console.error(err);
                continueRender(handle);
            });
    }, [handle]);

    return (
        <>
            <Composition
                id="ConcreteReport"
                component={ConcreteReportVideo}
                durationInFrames={450} // 15 seconds * 30 fps
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    data: data,
                }}
            />
        </>
    );
};
