import { useAuth } from '../context/useAuth';

function Update() {
    const { currentProduct } = useAuth();
    console.log(currentProduct);

    return (
        <div>
            <p>{currentProduct?.name}</p>
        </div>
    );
}

export default Update;
