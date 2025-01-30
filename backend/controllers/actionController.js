
class actionController {

    async undo(res, req, next) {
        
        try {

            const latestAction = await Action.findOne({ undone: false }).sort({ createdAt: -1 }).populate('refId');

            if(!latestAction) return res.code(404).json({message: "There is no action to undo"});

            const order = latestAction.refId;

            if (!order) return res.status(404).json({ message: "Referenced document not found." });
            
            await order.deleteOne();

            latestAction.undone = true;
            
            await latestAction.save();

            return res.status(200).json({ message: "Action undone successfully." });

        } catch (error) {
            next(error);
        }

    }

}

export default new actionController()