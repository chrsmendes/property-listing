const model = require('../models/propertyModel')
const router = express.Router();
const { validateObjectId } = require('../middleware/validationMiddleware')
const propertyRoute = {}

/* ***************************
* Delete controller Property using id
*****************************/

propertyRoute.deleteProperty = async (req, res) => {
    const { id } = req.body
        try{
            const result = await model.findByIdAndDelete(id)
            if(result){
                res.status(201).json({ message: 'Property was been deleted' })
            } else {
                res.status(400).json({ message: 'Error deleting property' })
            }
        } catch (error) {
            res.status(500).json({ Error: 'Error delting property' + error.message })
        }
  }


/* ***************************
* Put controller Property using id
*****************************/
    
propertyRoute.putProperty = async (req, res) => {
    const { id ,title, description, address, propertyType, size, rooms, amenities, pricePerNight, maxGuests, images, rules, propertyManager } = req.body

        try{
            const result = await model.findByIdAndUpdate(id,{
                title, description, address, propertyType, size, rooms, amenities, pricePerNight, maxGuests, images, rules, propertyManager
            },
            { 
                new:true,
            })
            if(result){
                res.status(201).json({ message: 'Property was been updated', property: result })
            } else {
                res.status(400).json({ message: 'Error updating the property' + property })
            }
        } catch (error) {
            res.status(500).json({ Error: 'Error upadating property' + error.message })

        }
        
}


    router.delete('/:id', validateObjectId, propertyRoute.deleteProperty)
    router.put('/:id', validateObjectId, propertyRoute.putProperty)

    module.exports = propertyRoute