const Barber = require("../models/barberModel");

const resetAvailableSlots = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to midnight of the current day
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
  
      // Find all barbers with available slots
      const barbers = await Barber.find({ 'availableSlots.0': { $exists: true } });
  
      // Reset available slots for each barber
      await Promise.all(barbers.map(async (barber) => {
        // Filter out appointments that are after today
        barber.availableSlots = barber.availableSlots.filter(slot => slot < tomorrow);
        await barber.save();
      }));
    } catch (error) {
      console.error('Error resetting available slots:', error);
    }
  };
module.exports = resetAvailableSlots