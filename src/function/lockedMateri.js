function LockStatusMateri(data) {
    let previousPhasePassed = true;
    console.log(data)

    return data.map((phase, index) => {
        const isCurrentPhaseLocked = !previousPhasePassed;

        if (isCurrentPhaseLocked) {
            return {
                ...phase,
                locked: true
            };
        }

        console.log(phase)

        previousPhasePassed = phase.ujian.every(ujianItem => 
            ujianItem.riwayat && ujianItem.riwayat.every(riwayatItem => riwayatItem.lulus)
        );

        return {
            ...phase,
            locked: false
        };
    });
}

module.exports = {LockStatusMateri}