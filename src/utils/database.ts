import * as mongoose from "mongoose";
import IceCream from "@/models/iceCream";
import User from "@/models/user";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!, {
            // todo: Getting errors for useNewUrlParser and useUnifiedTopology. Research later.
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        });
        console.log("connected to MongoDB!");
        // await addInitialFlavors();
        // await updateAllUsers();
    } catch (error) {
        console.log(error);
    }
};

const addInitialFlavors = async () => {
    const initialFlavors = [
        { id: '1', name: 'Vanilla', imageURL: 'vanilla.png'},
        { id: '2', name: 'Chocolate', imageURL: 'chocolate.png'},
        { id: '3', name: 'Strawberry', imageURL: 'strawberry.png'},
        { id: '4', name: 'OrangeSorbet', imageURL: 'orangeSorbet.png'},
    ];

    for (const flavor of initialFlavors) {
        const existingFlavor = await IceCream.findOne({ id: flavor.id });
        if (!existingFlavor) {
            const iceCream = new IceCream(flavor);
            await iceCream.save();
            console.log(`Added ${flavor.name} ice-cream to collection!`)
        }
    }
}
const updateAllUsers = async () => { // a test function for adding items to the unlockedIceCream array in the database
    try {
        const result = await User.updateMany(
            {}, // Empty filter, so it should update all documents
            { $set: {
                "unlockedIceCreams": [
                    {
                    iceCream: '64e8f67fcdf0a19aba869ce5',
                    // iceCream: 'vanilla',
                    quantity: 2,
                    },
                    {
                    iceCream: '64e8f67fcdf0a19aba869ceb',
                    // iceCream: 'strawberry',
                    quantity: 7,
                    },
                ],
                }
            } // Setting the "newFieldTest" to an empty array
        ).exec();
        console.log('Update all users result:', result);
    } catch (error) {
        console.log('An error occurred:', error);
    }
};
