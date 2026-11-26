from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Matakuliah


# 1. READ ALL: Menampilkan daftar seluruh matakuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data matakuliah"""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()

    daftar_matakuliah = []
    for mk in matakuliahs:
        daftar_matakuliah.append(mk.to_dict())

    return {'matakuliahs': daftar_matakuliah}


# 2. READ ONE: Menampilkan detail satu matakuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu matakuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if mk is None:
        return HTTPNotFound(
            json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}
        )

    return {'matakuliah': mk.to_dict()}


# 3. CREATE: Menambahkan data matakuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan matakuliah baru dari payload JSON"""
    try:
        json_data = request.json_body

        # Validasi field wajib diisi
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data or json_data[field] is None or json_data[field] == '':
                return HTTPBadRequest(
                    json_body={'error': f'Field {field} wajib diisi!'}
                )

        # Validasi nilai sks harus integer lebih dari 0
        sks = json_data['sks']
        if type(sks) is not int or sks <= 0:
            return HTTPBadRequest(
                json_body={'error': 'Field sks harus berupa angka bulat lebih dari 0'}
            )

        # Validasi nilai semester harus integer lebih dari 0
        semester = json_data['semester']
        if type(semester) is not int or semester <= 0:
            return HTTPBadRequest(
                json_body={'error': 'Field semester harus berupa angka bulat lebih dari 0'}
            )

        mk = Matakuliah(
            kode_mk=json_data['kode_mk'],
            nama_mk=json_data['nama_mk'],
            sks=sks,
            semester=semester,
        )

        dbsession = request.dbsession
        dbsession.add(mk)
        # Flush agar ID yang dibuat PostgreSQL langsung tersedia
        dbsession.flush()

        return {'success': True, 'matakuliah': mk.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE: Mengubah data matakuliah yang sudah ada
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk mengupdate data matakuliah berdasarkan ID"""
    dbsession = request.dbsession
    mk_id = request.matchdict['id']

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return HTTPNotFound(
            json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}
        )

    try:
        json_data = request.json_body

        if 'kode_mk' in json_data:
            mk.kode_mk = json_data['kode_mk']
        if 'nama_mk' in json_data:
            mk.nama_mk = json_data['nama_mk']

        if 'sks' in json_data:
            sks = json_data['sks']
            if type(sks) is not int or sks <= 0:
                return HTTPBadRequest(
                    json_body={'error': 'Field sks harus berupa angka bulat lebih dari 0'}
                )
            mk.sks = sks

        if 'semester' in json_data:
            semester = json_data['semester']
            if type(semester) is not int or semester <= 0:
                return HTTPBadRequest(
                    json_body={'error': 'Field semester harus berupa angka bulat lebih dari 0'}
                )
            mk.semester = semester

        dbsession.flush()

        return {'success': True, 'matakuliah': mk.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE: Menghapus data matakuliah
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus matakuliah berdasarkan ID"""
    dbsession = request.dbsession
    mk_id = request.matchdict['id']

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return HTTPNotFound(
            json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}
        )

    dbsession.delete(mk)

    return {
        'success': True,
        'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus',
    }
