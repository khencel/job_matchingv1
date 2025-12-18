export default function Card(){
    return (
        <>
            <div className="card m-auto rounded-4 shadow" style={{ maxWidth: '400px' }}>
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" 
                    className="card-img-top" 
                    alt="Person working on laptop"
                    style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h2 className="card-title h4 fw-bold mb-2">Sales Admin</h2>
                    <p className="text-muted mb-3">Cecil Grocery Incorporated</p>
                    <p className="card-text">
                    We are looking for a <strong>friendly and reliable cashier</strong> to join our team.
                    </p>
                </div>
            </div>
        </>
    )
}