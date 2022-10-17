import { useEffect, useState } from "react"
import CountUp from 'react-countup';

export default function Box({ title, count }: { title: string, count: any }) {

    const [start, setStart] = useState(count)
    const [end, setEnd] = useState(count)

    useEffect(() => {
        setStart(end); setEnd(count);
    }, [count])

    return <>
        <div>
            <h3>{title}</h3>
            <h1>
                {!isNaN(count) ?
                    <CountUp start={start} end={end} delay={0} separator="," duration={0.5}>
                        {({ countUpRef }) => (
                            <div>
                                <span ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>
                    :
                    <>{count}</>
                }
            </h1>
        </div>
    </>

}