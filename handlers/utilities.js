const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const User = mongoose.model("User");
const Bit = mongoose.model("Bit");
import moment from 'moment';

export function resetDailyWordCount(lastUpdated) {
    const today = moment()
    const userDate = moment(lastUpdated)
    const time = moment.duration(today.diff(userDate));
    const hours = time.asHours();
    console.log(hours);
    return hours > 24;
}

export async function getUsersWordCount(user) {
    const bitsByUser = await Bit.find({
        author: user._id
    })

    const totalWordCount = bitsByUser.reduce((acc, curr) => curr.word_count + acc, 0)
    return totalWordCount;
}

export async function updateUsersTotalWordCount(user, resetDailyCount, oldWordCount, newWordCount) {
    const totalWordCount = await getUsersWordCount(user);
    const wordsWrittenAlready = user.stats.wordsWrittenToday.dailyWordCount;
    const wordsAddedToTheBit = newWordCount - oldWordCount;
    const dailyWordCount = resetDailyCount ? wordsAddedToTheBit : wordsWrittenAlready + wordsAddedToTheBit; 
    const recordKey = moment().format('MM-DD-YYYY');

    const streak = user.streak || [];
    const recordIndex = streak.findIndex(day => day.timestamp === recordKey);

    if (recordIndex > -1) {
        streak[recordIndex].dailyWordCount = dailyWordCount
    } else {
        streak.push({ timestamp: recordKey, dailyWordCount });
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: user.id },
        { 
            streak,
            stats: 
                { 
                    totalWordsWritten: totalWordCount,
                    wordsWrittenToday: {
                        dailyWordCount: dailyWordCount,
                        lastUpdated: moment().local()
                    }
                }
        }
    )
}