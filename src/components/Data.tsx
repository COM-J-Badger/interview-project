import { SampleData } from "api/types";
import axios from 'axios';
//import e from "express";
import { useEffect, useState } from "react";

function Data() {
    const [data, setData] = useState<SampleData | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: allData } = await axios.get<SampleData>('/api/back-end');

            if (mounted) {
                setData(allData)
            }
        }

        fetchData();

        return () => { mounted = false; }
    }, [])

    let tasks: number = 0;
    let problems: number = 0;
    let issues: number = 0;

    let high : number = 0;
    let medium : number = 0;
    let low : number = 0;

    data?.results.forEach(count)

    function count(item: { type: string, priority: string }) {
        if (item.type === 'task') {
            tasks++;
        } else if (item.type === 'problem') {
            problems++;
        } else if (item.type === 'issue') {
            issues++;
        }

        if (item.priority === 'high') {
            high++;
        }
        else if (item.priority === 'medium') {
            medium++;
        }
        else if (item.priority === 'low') {
            low++;
        }
    }


    if (!data) {
        return 'loading data...';
    }

    return (
        <div className='border p-4'>
            <pre className='text-sm'> Back-End Task 1:</pre>
            <pre className='text-sm'> Tasks = {tasks}, Problems = {problems}, Issues = {issues}</pre>
            <pre className='text-sm'> Tasks = {((tasks/500) * 100).toFixed(2)}%, Problems = {((problems/500) * 100).toFixed(2)}%, Issues = {((issues/500) * 100).toFixed(2)}%</pre>
            <br></br>
            <pre className='text-sm'> Back-End Task 2:</pre>
            <pre className='text-sm'> High = {high}, Medium = {medium}, Low = {low}</pre>
            <pre className='text-sm'> High = {((high/500) * 100).toFixed(2)}%, Medium = {((medium/500) * 100).toFixed(2)}%, Low = {((low/500) * 100).toFixed(2)}%</pre>
        </div>
    )

}

export default Data
