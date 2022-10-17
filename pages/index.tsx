import type { NextPage } from 'next'
import Box from '../components/Box'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useEffectOnce } from '../functions/useEffectOnce'



export async function getServerSideProps() {
    const props = {
        summary: (await (await fetch('http://rpi.local:8080/admin/api.php?summary')).json() as any),
        recentBlocked: (await (await fetch('http://rpi.local:8080/admin/api.php?recentBlocked&auth=' + process.env.API_KEY)).text() as any)
    }
    return {
        props: {
            props
        }
    }
}


const Home: NextPage = ({ props }: any) => {
    const [dnsQueriesToday, setDnsQueriesToday] = useState(parseInt((props.summary.dns_queries_today).replace(",", "")))
    const [adsBlockedToday, setAdsBlockedToday] = useState(parseInt((props.summary.ads_blocked_today).replace(",", "")))
    const [recentBlocked, setRecentBlocked] = useState(props.recentBlocked)

    useEffectOnce(() => {
        setInterval(async () => {
            const props = {
                summary: (await (await fetch('http://rpi.local:8080/admin/api.php?summary')).json() as any),
                recentBlocked: (await (await fetch('http://rpi.local:8080/admin/api.php?recentBlocked&auth=' + process.env.API_KEY)).text() as any)
            }
            setDnsQueriesToday((props.summary.dns_queries_today).replace(",", ""))
            setAdsBlockedToday((props.summary.ads_blocked_today).replace(",", ""))
            setRecentBlocked(props.recentBlocked)
        }, 100)
    })


    return (
        <>
            <Box title="Total queries over last 24 hours" count={dnsQueriesToday}></Box>
            <Box title="Blocked queries over last 24 hours" count={adsBlockedToday}></Box>
            <Box title="Recently blocked" count={recentBlocked}></Box>
        </>
    )
}

export default Home
