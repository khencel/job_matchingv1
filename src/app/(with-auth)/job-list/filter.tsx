export default function Filter(){
    return (
        <>
            <div className="p-3 border filter-cont">
                <div>
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <span className="primary-text fw-bold">Job Type</span>
                        <span className="text-danger"><small>Clear All</small></span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>Full Time</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>Part Time</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>Contract/Temp</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>Casual/Vacation</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                        <span className="primary-text fw-bold">Work Setup</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>On-site</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>Hybrid</span>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" /> <span>Remote</span>
                    </div>
                </div>
            </div>
        </>
    )
}