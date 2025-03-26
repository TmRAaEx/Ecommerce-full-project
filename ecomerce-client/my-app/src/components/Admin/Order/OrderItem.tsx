import IOrderItem from "@interfaces/IOrderItem.ts";

export const OrderItemRow = ({item}: { item: IOrderItem }) => {

    return (
        <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="p-3 flex items-center">
                <span className="text-sm font-medium text-gray-800">{item.product_name}</span>
            </td>
            <td className="p-3 text-sm text-gray-700 text-center">

                <span>{item.quantity}</span>

            </td>
            <td className="p-3 text-sm text-gray-700 text-center">{item.unit_price} SEK</td>
            <td className="p-3 text-sm text-gray-700 text-center">{item.unit_price * item.quantity} SEK</td>

        </tr>
    );
};