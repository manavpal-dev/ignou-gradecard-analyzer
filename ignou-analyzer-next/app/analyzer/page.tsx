'use client'

import { useState } from "react";

export default function AnalyzerPage() {

    const [program, setProgram] = useState<string>("");
    const [enrollment, setEnrollment] = useState<string>("");

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(program, enrollment);
    }

    return (

        <div className="bg-white text-black">
            <h1 className="font-bold text-center">
                IGNOU Grade Card in Next.js
            </h1>

            <form action="" onSubmit={onSubmitHandler}>
                <label htmlFor="program">Program</label>
                <select id="program"
                    required
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}>
                    <option value="">Select Program</option>
                    <option value="BCA">BCA</option>
                    <option value="BCAOL">BCAOL</option>
                    <option value="BCA_NEW">BCA_NEW</option>
                    <option value="BCA_NEWOL">BCA_NEWOL</option>
                </select>

                <label htmlFor="">Enrollment Number</label>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnrollment(e.target.value)}
                    type="number"
                    required />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}