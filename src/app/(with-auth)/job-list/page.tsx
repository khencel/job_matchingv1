import JobSearchFiler from "@/app/components/JobSearchFilter"
import Filter from "./filter"
import Card from "./card"

export default function JobListing(){
    return (
        <div>
            <JobSearchFiler/>
            <div className="row justify-content-center m-0">
                <div className="col-md-3 p-2">
                    <Filter/>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div><div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                        <div className="col-md-3 p-2">
                            <Card/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}