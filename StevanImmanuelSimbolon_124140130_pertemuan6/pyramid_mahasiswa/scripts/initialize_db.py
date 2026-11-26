import argparse
from datetime import date
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add or update models / fixtures in the database.

    """
    existing_model = dbsession.query(models.mymodel.MyModel).filter_by(name='one').first()
    if not existing_model:
        model = models.mymodel.MyModel(name='one', value=1)
        dbsession.add(model)

    mahasiswa_awal = [
        models.Mahasiswa(
            nim='12345',
            nama='Stevan',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(1945, 8, 17),
            alamat='Jl. Merdeka No. 123, Bandung',
        ),
        models.Mahasiswa(
            nim='54321',
            nama='Maximus Decimus',
            jurusan='Sistem Informasi',
            tanggal_lahir=date(152, 3, 15),
            alamat='Jl. Mawar No. 45, Jakarta',
        ),
    ]

    for mhs in mahasiswa_awal:
        if dbsession.query(models.Mahasiswa).filter_by(nim=mhs.nim).first() is None:
            dbsession.add(mhs)

    # Data awal untuk tabel matakuliah
    matakuliah_awal = [
        models.Matakuliah(
            kode_mk='IF2110',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=3,
        ),
        models.Matakuliah(
            kode_mk='IF3140',
            nama_mk='Basis Data',
            sks=4,
            semester=3,
        ),
        models.Matakuliah(
            kode_mk='IF3210',
            nama_mk='Pengembangan Aplikasi Mobile',
            sks=3,
            semester=5,
        ),
    ]

    for mk in matakuliah_awal:
        if dbsession.query(models.Matakuliah).filter_by(kode_mk=mk.kode_mk).first() is None:
            dbsession.add(mk)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')


if __name__ == '__main__':
    main()
