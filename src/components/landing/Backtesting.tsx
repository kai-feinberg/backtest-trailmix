"use client"

import { CartesianGrid, Line, AreaChart, Area, XAxis, ResponsiveContainer } from "recharts"
import coinData from "@/lib/updated_backtest.json"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
    Card,
    CardDescription,
    CardFooter,
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
import { Button } from "../ui/button"

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
                        <SelectTrigger className="bg-transparent rounded-xl mb-4 align-center text-lg inline-flex w-auto min-w-[200px]">
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
                                    <CardTitle>Trailmix</CardTitle>
                                    <CardDescription>
                                        Default Trailmix strategy
                                    </CardDescription>
                                </CardHeader>
                                <Badge className={`text-base ${Number(profit) >= 0 ? 'bg-green-200' : 'bg-red-200'} h-full text-black`}>
                                    {profit > 0 ? `+$${formatNumber(Number(profit.toFixed(0)))}` : `-$${formatNumber(Number(Math.abs(profit).toFixed(0)))}`}
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
                    <CardFooter>
                        <p>
                            Pros
                            - aasdfasdasd
                            -adsfasd
                        </p>
                    </CardFooter>
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
                                {hodlProfit > 0 ? `+$${formatNumber(Number(hodlProfit.toFixed(0)))}` : `-$${formatNumber(Number(Math.abs(hodlProfit).toFixed(0)))}`}
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
                    <CardFooter>
                        <p>
                            Pros
                            - aasdfasdasd
                            -adsfasd
                        </p>
                    </CardFooter>
                </Card >
            </div>
            
            <div> explanation here</div>
            
            <div className="flex flex-row py-10 justify-center gap-10">
                <p className="text-3xl font-medium w-[40%]">See how this compares to investing in the crypto market as a whole</p>
                <Card className="bg-gray-900 rounded-xl border p-6 w-2/5 max-w-4xl">
                      <div className="space-y-4">
                        <div className="aspect-[16/9] mb-2 w-full">
                            <div className="flex flex-row justify-between align-items-flex-end">
                                <CardHeader>
                                    <CardTitle>Crypto Market Index (AMKT)</CardTitle>
                                    <CardDescription>
                                        HODL strategy
                                    </CardDescription>
                                </CardHeader>
                                <Badge className={`text-base ${Number(amktProfit) >= 0 ? 'bg-green-200' : 'bg-red-200'} h-full text-black`}>
                                    {amktProfit > 0 ? `+$${formatNumber(Number(amktProfit.toFixed(0)))}` : `-$${formatNumber(Number(Math.abs(amktProfit).toFixed(0)))}`}
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
                        <CardFooter>
                            <p>
                                Pros
                                - aasdfasdasd
                                -adsfasd
                            </p>
                        </CardFooter>
                    </Card >
            </div>
        </div >



    )
}