import connectDB from "@/lib/mongodb";
import { creatproduct, getproduct } from "@/app/controller/product";


// ✅ GET all products
export async function GET(req) {
    await connectDB();
    return getproduct(req);
}

// ✅ CREATE product
export async function POST(req) {
    await connectDB();
    return creatproduct(req);
}


