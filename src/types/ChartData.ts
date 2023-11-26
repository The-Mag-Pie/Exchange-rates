export interface ChartDataset {
    label: string
    backgroundColor: string
    data: number[]
}

export default interface ChartData {
    labels: string[]
    datasets: ChartDataset[]
}
