import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, update, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { database } from "../../fireBaseConfig";
import { auth } from "../../fireBaseConfig";

const WishlistButton = ({ property_id }) => {
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser.uid);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        const wishlistRef = ref(database, `wishlist/${user}`);

        get(wishlistRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setWishlist(snapshot.val() || {});
                } else {
                    setWishlist({});
                }
            })
            .catch((error) => console.error("Error fetching wishlist:", error));
    }, [user]);

    const isWishlisted = wishlist[property_id];

    const toggleWishlist = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        const wishlistRef = ref(database, `wishlist/${user}/${property_id}`);

        try {
            if (isWishlisted) {
                await remove(wishlistRef);
                setWishlist((prev) => {
                    const newWishlist = { ...prev };
                    delete newWishlist[property_id];
                    return newWishlist;
                });
            } else {
                await update(ref(database, `wishlist/${user}`), {
                    [property_id]: true,
                });
                setWishlist((prev) => ({ ...prev, [property_id]: true }));
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <div className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md">
            {isWishlisted ? (
                <FaHeart
                    className="text-red-500 cursor-pointer"
                    size={20}
                    onClick={toggleWishlist}
                />
            ) : (
                <FaRegHeart
                    className="text-gray-600 hover:text-red-500 transition duration-300 cursor-pointer"
                    size={20}
                    onClick={toggleWishlist}
                />
            )}
        </div>
    );
};

export default WishlistButton;
