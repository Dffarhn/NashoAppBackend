function LockStatusMateri(data) {
    let previousPhasePassed = true;

    return data.map((phase, index) => {
        const isCurrentPhaseLocked = !previousPhasePassed;

        if (isCurrentPhaseLocked) {
            return {
                ...phase,
                materi: phase.materi.map(materi => ({ ...materi, locked: true })),
                ujian: phase.ujian.map(ujian => ({ ...ujian, locked: true }))
            };
        }

        previousPhasePassed = phase.ujian.every(ujianItem => 
            ujianItem.riwayat && ujianItem.riwayat.every(riwayatItem => riwayatItem.lulus)
        );

        return {
            ...phase,
            materi: phase.materi.map(materi => ({ ...materi, locked: false })),
            ujian: phase.ujian.map(ujian => ({ ...ujian, locked: false }))
        };
    });
}

module.exports = { LockStatusMateri };
