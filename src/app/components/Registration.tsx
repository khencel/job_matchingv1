import SampleCard from "./registration/card";

export default function Registration() {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-9">
                <div className="row">
                    <div className="col"><SampleCard/></div>
                    <div className="col"><SampleCard/> </div>
                    <div className="col"><SampleCard/></div>
                </div>
            </div>
        </div>
    </div>
  );
}
