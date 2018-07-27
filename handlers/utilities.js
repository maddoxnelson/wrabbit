const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const User = mongoose.model("User");
const Bit = mongoose.model("Bit");
import moment from 'moment';

export function resetDailyWordCount(lastUpdated) {
    const today = moment()
    const userDate = moment(lastUpdated)
    return today.format('dd') !== userDate.format('dd')
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

    const recordKey = moment().format('YYYY-MM-DD');

    const records = Object.assign({}, ...user.stats.streakValues);

    const filteredRecord = Object.keys(records)
                                .filter(key => key === recordKey)
                                .map(item => {
                                    return {
                                        [item] : records[item]
                                    }
                                })
                                
    
    console.log({filteredRecord})

    const updatedUser = await User.findOneAndUpdate(
        { _id: user.id },
        { stats: 
            {   
                streakValues: [
                    { "2018-07-23": 200 },
                    { "2018-07-22": 300 },
                    { "2018-07-21": 165 }
                ],
                totalWordsWritten: totalWordCount,
                wordsWrittenToday: {
                    dailyWordCount: dailyWordCount,
                    lastUpdated: moment()
                }
            }
        }
    )
}