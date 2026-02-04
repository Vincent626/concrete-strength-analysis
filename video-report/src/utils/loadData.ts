import { continueRender, delayRender } from 'remotion';
import Papa from 'papaparse';

export interface ConcreteData {
    date: string;
    batch: string;
    type: 'S60' | 'M60';
    strength: number;
    current: number; // For M60
    wbRatio: number; // For S60
}

export const loadData = async (sourceUrl: string = '/data.csv'): Promise<ConcreteData[]> => {
    const handle = delayRender();

    try {
        const response = await fetch(sourceUrl);
        const text = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(text, {
                header: true,
                complete: (results) => {
                    const parsedData = results.data
                        .filter((row: any) => row.match_key) // Filter empty
                        .map((row: any) => ({
                            date: row['日期'],
                            batch: row.match_key,
                            type: row['母體'],
                            strength: parseFloat(row['平均強度']) || 0,
                            current: parseFloat(row['最終電流']) || 0,
                            wbRatio: parseFloat(row['水膠比']) || 0,
                        }));

                    resolve(parsedData);
                    continueRender(handle);
                },
                error: (err) => {
                    reject(err);
                    continueRender(handle);
                }
            });
        });
    } catch (e) {
        continueRender(handle);
        console.error("Fetch error", e);
        return [];
    }
};
