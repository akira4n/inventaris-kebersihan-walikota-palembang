<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use App\Models\StokMutasi;
use App\Exports\StokLaporanExport;
use App\Models\Item;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::all();
        return Inertia::render('Items/Index', [
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_barang' => 'required|string|max:255',
            // 'stok' => 'required|integer',
            'harga' => 'required|numeric|min:0',
        ]);

        $item = Item::create($validatedData);

        return redirect()->route('items.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = Item::findOrFail($id);

        return Inertia::render('Items/Edit', [
            'item' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate(
            [
                'nama_barang' => 'required|string|max:255',
                // 'stok' => 'required|integer',
                'harga' => 'required|numeric|min:0',
            ],
            [
                'nama_barang.required' => 'nama barang harus diisi',
            ]
        );

        $item = Item::findOrFail($id);

        $item->update($validatedData);

        return redirect()->route('items.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = Item::findOrFail($id);

        $item->delete();

        return redirect()->route('items.index');
    }

    /**
     * Menyimpan data barang masuk & update stok.
     */
    public function storeStokMasuk(Request $request)
    {
        $data = $request->validate([
            'item_id' => 'required|exists:items,id',
            'jumlah' => 'required|integer|min:1',
            'keterangan' => 'required|string|max:255',
        ]);

        try {
            DB::transaction(function () use ($data) {
                $item = Item::findOrFail($data['item_id']);

                $item->stok += $data['jumlah'];
                $item->save();

                StokMutasi::create([
                    'item_id' => $data['item_id'],
                    'user_id' => Auth::id(),
                    'jumlah' => $data['jumlah'],
                    'tipe' => 'masuk',
                    'keterangan' => $data['keterangan'],
                ]);
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menyimpan stok: ' . $e->getMessage());
        }

        return redirect()->route('items.index')->with('success', 'Stok berhasil ditambahkan!');
    }
}
