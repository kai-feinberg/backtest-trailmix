"use client"

import { CartesianGrid, Line, AreaChart, Area, XAxis, ResponsiveContainer } from "recharts"
import coinData from "@/lib/updated_backtest.json"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useInView } from "react-intersection-observer"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

import CountUp from 'react-countup';
type CoinKey = keyof typeof coinData; // Define a type for the keys of coinData

const chartConfig = {
    desktop: {
        label: "PriceData",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "UpdateData",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


export default function Backtesting() {

    const [coin, setCoin] = useState<CoinKey>("optimism"); // Use the CoinKey type
    const data = coinData[coin]; // Now this will be correctly typed

    const amkt = coinData["amkt"];
    const amktProfit = amkt[amkt.length - 1].hold_value - amkt[0].hold_value
    const profit = data[data.length - 1].tsl_value - data[0].tsl_value

    const hodlProfit = data[data.length - 1].hold_value - data[0].hold_value


    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger only once when it becomes visible
        threshold: 0.1,    // Percentage of element visible before triggering
    });

    function formatNumber(num: number) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    return (
        <div className="">
            <div className="flex justify-center">
                <div className="flex flex-row">

                    <p className="text-5xl font-medium mb-8">
                        $10k deposited into
                    </p>
                    <Select value={coin} onValueChange={(value: CoinKey) => setCoin(value)}>
                        <SelectTrigger className="bg-transparent rounded-xl mb-8 align-center text-4xl inline-flex w-auto min-w-[200px]">
                            <SelectValue placeholder="Select a token" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                            <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                            <SelectItem value="optimism">Optimism (OP)</SelectItem>
                            <SelectItem value="arbitrum">Arbitrum (ARB)</SelectItem>
                            <SelectItem value="uniswap">Uniswap (UNI)</SelectItem>
                            <SelectItem value="chainlink">Chainlink (LINK)</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-5xl font-medium">
                        would now be worth ...
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-center">
                <Card className="bg-gray-900 rounded-xl border p-6 w-2/5 max-w-4xl">
                    <div className="space-y-4">
                        <div className="aspect-[16/9] mb-2 w-full">
                            <div className="flex flex-row justify-between align-items-flex-end">
                                <CardHeader>
                                    <CardTitle><a href="https://trailmix.cash" target="_blank" rel="noopener noreferrer" className="text-white">Trailmix.cash</a></CardTitle>
                                    <CardDescription>
                                        Default Trailmix strategy
                                    </CardDescription>
                                </CardHeader>
                                <Badge className={`text-base ${Number(profit) >= 0 ? 'bg-green-200' : 'bg-red-200'} h-full text-black`}>
                                    {profit > 0 ? `$${formatNumber(Number(profit.toFixed(0))+10000)}` : `$${formatNumber(Number(Math.abs(profit).toFixed(0))+10000)}`}
                                </Badge>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={data}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="timestamp"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 4)}
                                            tick={false}
                                        />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                        <defs>
                                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="tsl_value"
                                            type="natural"
                                            fill="url(#fillDesktop)"
                                            fillOpacity={0.4}
                                            stroke="#8884a8"
                                        />
                                        <Line
                                            dataKey="tsl_value"
                                            type="monotone"
                                            stroke="blue"
                                            strokeWidth={2}
                                            dot={false}
                                            connectNulls={true}
                                        />

                                    </AreaChart>
                                </ChartContainer>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="text-xl underline font-bold mt-10 mb-5 pl-2">
                        Pros and Cons
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Improved Returns</h4>
                                    <p className="text-muted-foreground">TrailMix out performs HODLing on all assets.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Automatic risk management</h4>
                                    <p className="text-muted-foreground">Withdraw at any time knowing your gains have been locked in.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Customizable</h4>
                                    <p className="text-muted-foreground">Choose from a variety of preset strategies for any asset.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Opportunity Cost</h4>
                                    <p className="text-muted-foreground">Funds cannot participate in DeFi strategies.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Smart contract risk</h4>
                                    <p className="text-muted-foreground">Potential for (unlikely) exploit or attack.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Card >
                <Card className="bg-gray-900 rounded-xl border p-6 w-2/5 max-w-4xl">
                    <div className="space-y-4">
                        <div className="aspect-[16/9] mb-2 w-full">
                            <div className="flex flex-row justify-between align-items-flex-end">
                                <CardHeader>
                                    <CardTitle>Buy and Hold</CardTitle>
                                    <CardDescription>
                                        HODL strategy
                                    </CardDescription>
                                </CardHeader>
                                <Badge className={`text-base ${Number(hodlProfit) >= 0 ? 'bg-green-200' : 'bg-red-200'} h-full text-black`}>
                                {   hodlProfit > 0 ? `$${formatNumber(Number(hodlProfit.toFixed(0))+10000)}` : `$${formatNumber(Number((hodlProfit).toFixed(0))+10000)}`}
                                </Badge>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={data}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="timestamp"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 4)}
                                            tick={false}
                                        />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                        <defs>
                                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="hold_value"
                                            type="natural"
                                            fill="url(#fillDesktop)"
                                            fillOpacity={0.4}
                                            stroke="#8884a8"
                                        />
                                        <Line
                                            dataKey="hold_value"
                                            type="monotone"
                                            stroke="red"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="text-xl underline font-bold mt-10 mb-5 pl-2">
                        Pros and Cons
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Simplest Strategy</h4>
                                    <p className="text-muted-foreground">Just buy and forget. It's that easy.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Most Flexible</h4>
                                    <p className="text-muted-foreground">Can do for any asset across any network.</p>
                                </div>
                            </div>

                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Huge volatility</h4>
                                    <p className="text-muted-foreground">Portfolio will undergo massive changes in value.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Inefficient</h4>
                                    <p className="text-muted-foreground">Unable to capture profits from swings in market.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">No rug protection</h4>
                                    <p className="text-muted-foreground">No protection against crashes, rugs, or downturns.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Card >
            </div>
            <div className="text-center mt-10" ref={ref}>
                {inView ? (
                    <div className="text-4xl font-bold">
                    <span className="text-green-500">
                        +$<CountUp start={0} end={profit-hodlProfit} duration={3}/>
                    </span>
                </div>) : <div>0</div>}
                <h2 className="text-2xl font-bold m-4">Wow thats a pretty big difference. You could've made an additional ${formatNumber((profit-hodlProfit))}</h2>
                <h2 className="text-2xl font-bold m-4">just by using TrailMix! 
                    Learn more about TrailMix <a href="https://medium.com/@trailmix.crypto/introduction-to-trailmix-8f4cc81375b5" target="_blank" rel="noopener noreferrer">here</a></h2>

            </div>
             
            <div className="flex flex-row py-10 justify-center gap-10 mt-10">
                <div className="flex flex-col w-[30%]">
                    <p className="text-3xl font-medium mb-10">Let's see how this compares to investing in the crypto market as a whole</p>
                    <p className="text-xl">$AMKT is the token of the Alongside Crypto Market Index which tracks the market cap of the top cryptos. You can check them out at 
                        <a href="https://alongside.xyz/en-us" target="_blank" rel="noopener noreferrer"> alongside.xyz</a>
                    </p>
                </div>
                <Card className="bg-gray-900 rounded-xl border p-6 w-2/5 max-w-4xl">
                    <div className="space-y-4">
                        <div className="aspect-[16/9] mb-2 w-full">
                            <div className="flex flex-row justify-between align-items-flex-end">
                                <CardHeader>
                                    <CardTitle>Crypto Market Index ($AMKT)</CardTitle>
                                    <CardDescription>
                                        HODL strategy
                                    </CardDescription>
                                </CardHeader>
                                <Badge className={`text-base ${Number(amktProfit) >= 0 ? 'bg-green-200' : 'bg-red-200'} h-full text-black`}>
                                    {amktProfit > 0 ? `$${formatNumber(Number(amktProfit.toFixed(0))+10000)}` : `$${formatNumber(Number(Math.abs(amktProfit).toFixed(0))+10000)}`}

                                </Badge>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={amkt}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="timestamp"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 4)}
                                            tick={false}
                                        />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                        <defs>
                                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="hold_value"
                                            type="natural"
                                            fill="url(#fillDesktop)"
                                            fillOpacity={0.4}
                                            stroke="#8884a8"
                                        />
                                        <Line
                                            dataKey="hold_value"
                                            type="monotone"
                                            stroke="red"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="text-xl underline font-bold mt-10 mb-5 pl-2">
                        Pros and Cons
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Lessened Volatility</h4>
                                    <p className="text-muted-foreground">The crypto market will move less than any one coin.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-green-500" />
                                <div>
                                    <h4 className="font-medium">Diversification</h4>
                                    <p className="text-muted-foreground">Captures upside for crypto market as a whole.</p>
                                </div>
                            </div>

                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Reduced upside</h4>
                                    <p className="text-muted-foreground">Limited returns on investment relative to other strategies.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Still significant volatility</h4>
                                    <p className="text-muted-foreground">Crypto market itself undergoes swings of 50-70%.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-medium">Relies on trusted oracles</h4>
                                    <p className="text-muted-foreground">Smart contract risk in depending on third parties</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card >
            </div>
        </div >



    )
}